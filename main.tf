terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

provider "docker" {}

variable "image_tag" {}

resource "docker_image" "app" {
  name = "xraiinbowcoder/devops:${var.image_tag}"
}

resource "docker_container" "app" {
  name  = "devops-app"
  image = docker_image.app.name

  ports {
    internal = 10049
    external = 10049
  }
}
