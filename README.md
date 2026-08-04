# @pipeworx/dataverse-harvard

[Harvard Dataverse](https://dataverse.harvard.edu) MCP — research dataset repository hosting ~150k datasets. Keyless read.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `search(query, type?, sort?, per_page?, start?)` — search datasets / files / dataverses
- `dataset(persistent_id)` — full dataset metadata (DOI-style id)
- `dataset_files(persistent_id)` — list files in a dataset
- `dataverse(identifier)` — dataverse (collection) metadata

## Data source

`https://dataverse.harvard.edu/api/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "dataverse-harvard": {
      "url": "https://gateway.pipeworx.io/dataverse-harvard/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Dataverse Harvard data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
