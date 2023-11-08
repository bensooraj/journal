---
sidebar_position: 6
---

# Decoding using Body Schema

We can also decode HCL using [`hcl.BodySchema`](https://pkg.go.dev/github.com/hashicorp/hcl/v2#BodySchema). Following is an excerpt from the package's documentation,
```go title="github.com/hashicorp/hcl/blob/main/schema.go"
// BodySchema represents the desired shallow structure of a body.
type BodySchema struct {
	Attributes []AttributeSchema
	Blocks     []BlockHeaderSchema
}

// AttributeSchema represents the requirements for an attribute, and is used for matching attributes within bodies.
type AttributeSchema struct {
	Name     string
	Required bool
}

// BlockHeaderSchema represents the shape of a block header, and is used for matching blocks within bodies.
type BlockHeaderSchema struct {
	Type       string
	LabelNames []string
}
```

The parsing relies on predefined schemas (`GriffonBlockSchema`, `SSHKeyBlockSchema`, `ConfigSchema`) that describe the expected structure of HCL blocks,
```go title="config_body_schema.go"
var GriffonBlockSchema = &hcl.BodySchema{
	Blocks: []hcl.BlockHeaderSchema{},
	Attributes: []hcl.AttributeSchema{
		{Name: "region", Required: true},
		{Name: "vultr_api_key", Required: true},
	},
}

var SSHKeyBlockSchema = &hcl.BodySchema{
	Blocks: []hcl.BlockHeaderSchema{},
	Attributes: []hcl.AttributeSchema{
		{Name: "ssh_key", Required: true},
	},
}

var ConfigSchema = &hcl.BodySchema{
	Blocks: []hcl.BlockHeaderSchema{
		{Type: "griffon", LabelNames: []string{}},
		{Type: "ssh_key", LabelNames: []string{"name"}},
	},
	Attributes: []hcl.AttributeSchema{},
}
```

The actual parsing is done using the `hclsyntax.ParseConfig(...)` method which converts the raw HCL byte content into a structured format `file` (`*hcl.File`).

After that, content (`*hcl.BodyContent`) is extracted from `(hcl.File).Body` using the `(hcl.Body).Content(...)` method based on the overall HCL document's schema (`ConfigSchema`). This process gives us blocks ([`hcl.Block`](https://pkg.go.dev/github.com/hashicorp/hcl/v2#Block)) and attributes ([`hcl.Attribute`](https://pkg.go.dev/github.com/hashicorp/hcl/v2#Attribute)) which can be further iterated over as shown below,

```go title="parser_body_schema.go"
func ParseHCLUsingBodySchema(filename string, src []byte, ctx *hcl.EvalContext) (*Config, error) {
	config := Config{}

	file, diags := hclsyntax.ParseConfig(src, filename, hcl.Pos{Line: 1, Column: 1})
	// handle error

	bodyContent, diags := file.Body.Content(ConfigSchema)
	// handle error
    // ...
	blocks := bodyContent.Blocks.ByType()
	for blockName, hclBlocks := range blocks {
		switch blockName {
		case "griffon":
			// call block's specific parser based on the block's schema `GriffonBlockSchema`,
            // as shown in the next case ...
		case "ssh_key":
			for _, hclBlock := range hclBlocks {
				var sshKey SSHKeyBlock
				if err := sshKey.FromHCLBlock(hclBlock, ctx); err != nil {
					return nil, err
				}
				config.SSHKeys = append(config.SSHKeys, sshKey)
			}
		}
	}

	return &config, nil
}
```

And each block is further processed to extract its labels and attributes,
```go title="parser_body_schema.go"
func (s *SSHKeyBlock) FromHCLBlock(block *hcl.Block, ctx *hcl.EvalContext) error {
	content, diags := block.Body.Content(SSHKeyBlockSchema)
	// handle error
	s.Name = block.Labels[0] // extract labels

	for attrName, attr := range content.Attributes {
		value, diags := attr.Expr.Value(ctx)
    	// ...
		switch attrName {
		case "ssh_key":
			s.SSHKey = value.AsString() // parse each attribute
		// ...
		}
	}
	return nil
}
```

If you noticed, the onus is on us (*nice word play*) to extract these blocks, labels and attributes and load them into the structs `Config{}`.

## Pull request/Commits
1. [PR | Parse HCL from `hcl.BodySchema`](https://github.com/bensooraj/griffon/pull/5/files)
