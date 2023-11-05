---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Functions
This is a continuation of the [previous chapter](./eval-ctx-and-vars). Just like `Variables`, `Functions` is another field offered by `hcl.EvalContext`.

## Built-in
:::info
There are a number of [`standard library functions`](https://pkg.go.dev/github.com/zclconf/go-cty/cty/function/stdlib#pkg-functions) available in a [`stdlib`](https://github.com/zclconf/go-cty/tree/main/cty/function/stdlib) package within the [`cty`](https://github.com/zclconf/go-cty) repository, avoiding the need for each application to re-implement basic functions for string manipulation, list manipulation, etc. It also includes function-shaped versions of several operations that are native operators in HCL, which should generally not be exposed as functions in HCL-based configurationf formats to avoid user confusion. (source: [Expression Evaluation | Defining Functions](https://hcl.readthedocs.io/en/latest/go_expression_eval.html#defining-functions))
:::

We can call the `stblib` functions by attaching the ones we need to `hcl.EvalContext`,
```go title="parser.go"
func getEvalContext() *hcl.EvalContext {
	// ...
	functions := make(map[string]function.Function)

	// Built-in functions
    // highlight-start
	functions["uppercase"] = stdlib.UpperFunc
	functions["lowercase"] = stdlib.LowerFunc
    // highlight-end

	return &hcl.EvalContext{
		Variables: vars,
		Functions: functions,
	}
}
```

and invoking them in HCL as shown below,
```hcl showLineNumbers
griffon {
    // highlight-start
	region = uppercase(AMS)                      // result: "AMS"
	vultr_api_key = lowercase(env.VULTR_API_KEY) // result: "axdfcdasdfzzxserdfwsd"
    // highlight-end
}
ssh_key "my_key" {
	ssh_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADA"
}
```

## Custom

Sometimes (more often than that), we need more than what the `stdlib` has to offer. For example, if we want to load an SSH key from an existing public key file,
```hcl showLineNumbers
griffon {
	region = uppercase(AMS)
	vultr_api_key = lowercase(env.VULTR_API_KEY)
}
ssh_key "my_key" {
	ssh_key = file("~/.ssh/my_key.pub")
}
```

we can define a custom funtion named `file`,
```go title="parser.go"
func getEvalContext() *hcl.EvalContext {

    // ...
	functions := make(map[string]function.Function)

	// custom function
	functions["file"] = function.New(&function.Spec{
		Description: "Reads the contents of a file and returns it as a string.",
		Params: []function.Parameter{
			{Type: cty.String},                          // file path
		},
		Type: func(args []cty.Value) (cty.Type, error) { // or function.StaticReturnType(cty.String),
			return cty.String, nil                       // return type: file content as string
		},
		Impl: func(args []cty.Value, retType cty.Type) (cty.Value, error) {
			filename := args[0].AsString()
			fileBuffer, err := os.ReadFile(filename)
			if err != nil {
				return cty.StringVal(""), err
			}
			return cty.StringVal(string(fileBuffer)), nil
		},
	})

	return &hcl.EvalContext{
		Variables: vars,
		Functions: functions,
	}
}
```
