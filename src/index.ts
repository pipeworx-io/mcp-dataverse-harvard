interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Harvard Dataverse MCP.
 *
 * Auth: none for public read. Docs: https://guides.dataverse.org/en/latest/api/native-api.html
 */


const BASE = 'https://dataverse.harvard.edu/api';
const UA = 'pipeworx-mcp-dataverse-harvard/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'search',
    description: 'Search datasets / files / dataverses.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        type: { type: 'string', description: 'dataset | file | dataverse' },
        sort: { type: 'string', description: 'name | date' },
        per_page: { type: 'number', description: '1-1000 (default 25).' },
        start: { type: 'number' },
      },
      required: ['query'],
    },
  },
  {
    name: 'dataset',
    description: 'Dataset metadata by DOI persistent id (e.g. "doi:10.7910/DVN/...").',
    inputSchema: {
      type: 'object',
      properties: { persistent_id: { type: 'string' } },
      required: ['persistent_id'],
    },
  },
  {
    name: 'dataset_files',
    description: 'List files in a dataset.',
    inputSchema: {
      type: 'object',
      properties: { persistent_id: { type: 'string' } },
      required: ['persistent_id'],
    },
  },
  {
    name: 'dataverse',
    description: 'Dataverse (collection) metadata by alias or id.',
    inputSchema: {
      type: 'object',
      properties: { identifier: { type: 'string' } },
      required: ['identifier'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search': {
      const p = new URLSearchParams({
        q: reqStr(args, 'query', '"climate"'),
        per_page: String(Math.min(1000, Math.max(1, (args.per_page as number) ?? 25))),
        start: String(Math.max(0, (args.start as number) ?? 0)),
      });
      if (args.type) p.set('type', String(args.type));
      if (args.sort) p.set('sort', String(args.sort));
      return dvGet(`/search?${p}`);
    }
    case 'dataset': {
      const p = new URLSearchParams({ persistentId: reqStr(args, 'persistent_id', '"doi:10.7910/DVN/UMUBVZ"') });
      return dvGet(`/datasets/:persistentId?${p}`);
    }
    case 'dataset_files': {
      const p = new URLSearchParams({ persistentId: reqStr(args, 'persistent_id', '"doi:10.7910/DVN/UMUBVZ"') });
      return dvGet(`/datasets/:persistentId/versions/:latest/files?${p}`);
    }
    case 'dataverse':
      return dvGet(`/dataverses/${encodeURIComponent(reqStr(args, 'identifier', '"root"'))}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function dvGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('Dataverse: not found');
  if (!res.ok) throw new Error(`Dataverse: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
