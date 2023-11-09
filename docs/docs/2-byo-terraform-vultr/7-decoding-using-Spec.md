---
sidebar_position: 7
---

# Decoding using Spec

Yet another way to define the structure of an HCL document is using `hcldec.Spec`,
```go
type Spec interface {
	// contains filtered or unexported methods
}
```

:::info
A Spec is a description of how to decode a hcl.Body to a cty.Value.

The various other types in this package whose names end in "Spec" are the spec implementations. The most common top-level spec is ObjectSpec, which decodes body content into a cty.Value of an object type. (*source*: [*pkg doc*](https://pkg.go.dev/github.com/hashicorp/hcl/v2/hcldec#Spec))
:::

The `hcldec` package has many structs suffixed with `Spec` that satisfy the `Spec` interface, such as `ObjectSpec`, `BlockSpec`, `AttrSpec`, `BlockListSpec` etc. These can be used to define the specification of our HCL document,
```go title="config_spec.go"
// ConfigSpec is top-level object spec for the config file
var ConfigSpec hcldec.ObjectSpec = hcldec.ObjectSpec{
	"griffon": &GriffonSpec,
	"ssh_key": &SSHKeySpec,
}

// GriffonSpec is the spec for the griffon block
var GriffonSpec hcldec.BlockSpec = hcldec.BlockSpec{
	TypeName: "griffon",
	Nested: &hcldec.ObjectSpec{
		"region": &hcldec.AttrSpec{
			Name:     "region",
			Type:     cty.String,
			Required: true,
		},
		"vultr_api_key": &hcldec.AttrSpec{
			Name:     "vultr_api_key",
			Type:     cty.String,
			Required: true,
		},
	},
}

// SSHKeySpec is the spec for the ssh_key block
var SSHKeySpec hcldec.BlockListSpec = hcldec.BlockListSpec{
	TypeName: "ssh_key",
	Nested: &hcldec.ObjectSpec{
		"name": &hcldec.BlockLabelSpec{
			Index: 0,
			Name:  "name",
		},
		"ssh_key": &hcldec.AttrSpec{
			Name:     "ssh_key",
			Type:     cty.String,
			Required: true,
		},
	},
}
```

And parse the HCL using `hcldec.Decode` which returns a `cty.Value`. Then, we rely on the helper methods provided by the [`cty`](https://pkg.go.dev/github.com/zclconf/go-cty/cty#Value) package to iterate through each block, extract the value of each attribute and load them as string into the destination struct `Config`.

```go title="parser_spec.go"
func ParseHCLUsingSpec(filename string, src []byte, ctx *hcl.EvalContext) (*Config, error) {
	var config Config
	// ...
	val, diags := hcldec.Decode(file.Body, ConfigSpec, ctx) // val is of type cty.Value
	// ...
	for vName, v := range val.AsValueMap() {
		switch vName {
		case "griffon":
			config.Griffon = GriffonBlock{
				Region:      v.GetAttr("region").AsString(),
				VultrAPIKey: v.GetAttr("vultr_api_key").AsString(),
			}
		case "ssh_key":
			sshKeys := v.AsValueSlice()
			// ...
		}
	}
	return &config, nil
}
```

## Pull request/Commits
1. [PR | Parse HCL from `hcldec.Spec`](https://github.com/bensooraj/griffon/pull/6/files)
