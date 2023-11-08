---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Evaluation Context and Variables

## Evaluation Context

:::info
Each argument attribute in a configuration file is interpreted as an expression. In the HCL native syntax, certain basic expression functionality is always available, such as arithmetic and template strings, and the calling application can extend this by making available specific variables and/or functions via an **`evaluation context`**. (*source*: [*Expression Evaluation*](https://hcl.readthedocs.io/en/latest/go_expression_eval.html#expression-evaluation))
:::

All expressions or argument attributes up until now have been literal values (as shown in `literal.hcl` below). Let's now load these values using variables (`AMS` and `env.VULTR_API_KEY`) and functions (`file(...)`) instead (as shown in `dynamic.hcl` below).

<Tabs>
<TabItem value="hcl-literal" label="literal.hcl" default>

```hcl
griffon {
// highlight-start
	region = "ams"
	vultr_api_key = "1234567890"
// highlight-end
}
ssh_key "my_key" {
// highlight-start
	ssh_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADA"
// highlight-end
}
```

</TabItem>
<TabItem value="hcl-dynamic" label="dynamic.hcl">

```hcl
griffon {
// highlight-start
	region = AMS // or ${AMS}
	vultr_api_key = env.VULTR_API_KEY
// highlight-end
}
ssh_key "my_key" {
// highlight-start
	ssh_key = file("~/.ssh/griffon_ssh_key.pub")
// highlight-end
}
```

</TabItem>
</Tabs>

*`EvalContext`(`hcl.EvalContext`) is the type used to describe the `variables` and `functions` available during expression evaluation, if any.* (source: [Expression Evaluation | EvalContext](https://hcl.readthedocs.io/en/latest/go_expression_eval.html#hcl.EvalContext))

## Variables

If we parse the following HCL data without making any changes to the parser function `func ParseHCL(filename string, src []byte) (*Config, error) {...}`,
```hcl title="test.hcl" showLineNumbers
griffon {
    // highlight-start
    region = AMS
    // highlight-end
    vultr_api_key = "1234567890"
}
```

we will get the following error:
```bash
$ go test -timeout 30s -run ^TestParseGriffonBlock_Variables$ github.com/bensooraj/griffon -v
=== RUN   TestParseGriffonBlock_Variables
=== RUN   TestParseGriffonBlock_Variables/parse_AMS_as_a_variable
    parser_test.go:74: HCL diagnostic error [ 0 ]: test.hcl:3,14-17: Variables not allowed; Variables may not be used here.
    parser_test.go:74: HCL diagnostic error [ 1 ]: test.hcl:3,14-17: Unsuitable value type; Unsuitable value: value must be known
    require.go:794: 
                Error Trace:    parser_test.go:77
                Error:          Received unexpected error:
                                test.hcl:3,14-17: Variables not allowed; Variables may not be used here., and 1 other diagnostic(s)
                Test:           TestParseGriffonBlock_Variables/parse_AMS_as_a_variable
--- FAIL: TestParseGriffonBlock_Variables (0.00s)
    --- FAIL: TestParseGriffonBlock_Variables/parse_AMS_as_a_variable (0.00s)
FAIL
FAIL    github.com/bensooraj/griffon    0.474s
FAIL
```

In order for the parser to understand `AMS` as a variable, we will create an instance of `hcl.EvalContext` and pass it to `hclsimple.Decode(filename string, src []byte, ctx *hcl.EvalContext, target interface{}) error` as a the third argument ([`0863a4b`](https://github.com/bensooraj/griffon/commit/0863a4bbae5e838869fb805a9ae7a1f917df8268)).

```go title="parser.go"
// highlight-start
func ParseHCL(filename string, src []byte, ctx *hcl.EvalContext) (*Config, error) {
    // highlight-end
    // ...
}

func getEvalContext() *hcl.EvalContext {
    vars := make(map[string]cty.Value)

	// Region variables
    // highlight-start
	vars["AMS"] = cty.StringVal("ams")
    // highlight-end

	return &hcl.EvalContext{
		Variables: vars,
	}
}
```

We can also use these variables as template strings ([`cfd6327`](https://github.com/bensooraj/griffon/commit/cfd6327ad86c3b733d1688e689b12ed6c87de437)) as shown below,

<Tabs>
<TabItem value="hcl-example-1" label="Example 1" default>

```hcl showLineNumbers
griffon {
    // highlight-start
    region = "${AMS}terdam" // result: "amsterdam"
    // highlight-end
    vultr_api_key = "1234567890"
}
```

</TabItem>
<TabItem value="hcl-example-2" label="Example 2">

```hcl showLineNumbers
griffon {
    // highlight-start
	region = "${AMS == "ams" ? "toronto" : "amsterdam"}" // result: "toronto"
    // highlight-end
	vultr_api_key = "1234567890"
}
```

</TabItem>
</Tabs>

### Nested Variables

Say we want to load Vultr's API key from the environment,

```hcl showLineNumbers
griffon {
	region = "${AMS == "ams" ? "toronto" : "amsterdam"}" // result: "toronto"
    // highlight-start
	vultr_api_key = env.VULTR_API_KEY
    // highlight-end
}
```

We will use the method `func cty.ObjectVal(attrs map[string]cty.Value) cty.Value` to further nest key-value pairs and attach to `(hcl.EvalContext).Variables` as shown below ([`650a749`](https://github.com/bensooraj/griffon/commit/650a749799cceb60ff818a3ffdcc5e938790d513)),

```go title="parser.go"
func getEvalContext() *hcl.EvalContext {
	// ...
    // highlight-start
	// Environment variables
	vars["env"] = cty.ObjectVal(map[string]cty.Value{
		"VULTR_API_KEY": cty.StringVal(os.Getenv("VULTR_API_KEY")),
	})
    // highlight-end

	return &hcl.EvalContext{
		Variables: vars,
	}
}
```

## Pull request/Commits
1. [PR | Parse `Variables` with `hcl.EvalContext`](https://github.com/bensooraj/griffon/pull/3/files)
