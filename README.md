# mcp-dataverse-harvard

Harvard Dataverse MCP.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search` | Search datasets / files / dataverses. |
| `dataset` | Dataset metadata by DOI persistent id (e.g. "doi:10.7910/DVN/..."). |
| `dataset_files` | List files in a dataset. |
| `dataverse` | Dataverse (collection) metadata by alias or id. |

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

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
