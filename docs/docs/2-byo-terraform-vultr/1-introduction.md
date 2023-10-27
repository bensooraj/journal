---
sidebar_position: 1
---

# Introduction

We will use the following `HCL` configuration file to create and tear-down resources in `Vultr`,
```hcl title="griffon.hcl"
griffon {
    regiion = 'us-east-1'
}

data "region" "current" {}

data "plan" "all" {
    filter {
        region = region.current.id
        vcpu_count = 1
        ram = 1024
        disk = 20
    }
}

data "os" "centos" {
    filter {
        type = "vc2"
        name   = "CentOS 7 x64"
        arch   = "x64"
        family   = "centos"
    }
}

ssh_key "my_key" {
    name = "my_key"
    ssh_key = file("~/.ssh/id_rsa.pub")
}

startup_script "my_script" {
    name = "my_script"
    script = base64encode(file("script.sh"))
}

instance "my_vps" {
    region = data.region.current.id
    plan = data.plan.all.id
    os_id = data.os.centos.id

    sshkey_id = ssh_key.my_key.id
    script_id = startup_script.my_script.id

    hostname = "ben-vps"

    tags = {
        name = "ben-vps"
        tier = "web"
        env = "dev"
    }
}
```

Ingredients:
- [HCL v2 - HashiCorp configuration language](https://github.com/hashicorp/hcl)
- [Vultr API (2.0)](https://www.vultr.com/api/)
- Truck loads of patience...
