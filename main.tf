provider "docker" {
  host = "unix:///var/run/docker.sock"
}

resource "docker_image" "app" {
  name         = "yourdockerhubusername/devops:latest"  # Docker Hub repo name
  build {
    context    = "./"           # Path to your Dockerfile
    dockerfile = "./Dockerfile" # Path to your Dockerfile
  }
  tags = ["latest", var.image_tag]  # Tag the image with both `latest` and a dynamic image tag
}

resource "docker_registry_image" "app" {
  name = "yourdockerhubusername/devops:latest"  # The same as the Docker image name

  push {
    username = var.docker_username
    password = var.docker_password
  }
}

variable "image_tag" {
  type    = string
  default = "v1.0"  # Example tag (this can be dynamic based on the Git commit hash or version)
}

variable "docker_username" {
  type    = string
  default = "yourdockerhubusername"
}

variable "docker_password" {
  type    = string
  default = "yourdockerhubpassword"
}

