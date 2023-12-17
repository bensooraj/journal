---
sidebar_position: 8
---

# Final version
The proof-of-concept terraform-like IaC tool for Vultr is now complete. The goal was to understand HCL parsing, partial evaluation, resource creation etc. I do have a basic understanding now. Following is a brief video that showcases just that,

I wouldn't be continuing this series.

## Resources
1. [HCL Config Language Toolkit](https://hcl.readthedocs.io/en/latest/index.html)
2. [Build your own DSL with Go & HCL](https://blog.devgenius.io/build-your-own-dsl-with-go-hcl-602c92ce24c0)
    i. [wesovilabs/orion](https://github.com/wesovilabs)
3. [Creating Terraform-like configuration languages with HCL and Go](https://rotemtam.com/2022/08/06/configuration-languages-with-hcl/)
4. [hashicorp/terraform](https://github.com/hashicorp/terraform)
    i. [internal/configs/configschema/schema.go](https://github.com/hashicorp/terraform/blob/main/internal/configs/configschema/schema.go)
    ii. [internal/configs/depends_on.go](https://github.com/hashicorp/terraform/blob/main/internal/configs/depends_on.go)

## Pull request/Commits
1. [PR | Final version](https://github.com/bensooraj/griffon/pull/8/files)