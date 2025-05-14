variable "image_tag" {
  type    = string
  default = "latest"
}

resource "docker_image" "app" {
  name = "yourdockerhubusername/devops:${var.image_tag}"
}