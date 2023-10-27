---
sidebar_position: 2
---

# Decoding basic HCL

At the very basic level, we can use the [`Decode`](https://pkg.go.dev/github.com/hashicorp/hcl/v2@v2.19.1/hclsimple#Decode) method offered by the [`hcl/v2/hclsimple`](https://pkg.go.dev/github.com/hashicorp/hcl/v2@v2.19.1/hclsimple) package,
```go
func Decode(filename string, src []byte, ctx *hcl.EvalContext, target interface{}) error
```

to decode this HCL,
```hcl title="test.hcl"
griffon {
	region = "nyc1"
	vultr_api_key = "1234567890"
}
```

onto the following Golang struct,
```go title="config.go"
type Config struct {
	Griffon GriffonBlock `hcl:"griffon,block"`
}
// highlight-start
type GriffonBlock struct {
	Region      string `hcl:"region,attr"`
	VultrAPIKey string `hcl:"vultr_api_key"`
}
// highlight-end
```

## HCL constructs
In the HCL file,
* `griffon` is a `block`
* `region = "nyc1"` is an `argument`/`attribute`

An excerpt from [hcl.readthedocs.io](https://hcl.readthedocs.io/en/latest/intro.html#introduction-to-hcl),
:::info
The collection of arguments and blocks at a particular nesting level is called a body. A file always has a root body containing the top-level elements, and each block also has its own body representing the elements within it.

The term “attribute” can also be used to refer to what we’ve called an “argument” so far. The term “attribute” is also used for the fields of an object value in argument expressions, and so “argument” is used to refer specifically to the type of attribute that appears directly within a body.
:::

## Pull request/Commits
1. [PR | decoding a basic HCL to a Golang struct](https://github.com/bensooraj/griffon/pull/1/files)
