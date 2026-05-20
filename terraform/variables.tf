variable "aws_region" {
  description = "AWS region where resources will be deployed."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used as a prefix for all resource names."
  type        = string
  default     = "shortrace-analytics"
}

variable "environment" {
  description = "Deployment environment (e.g. prod, staging)."
  type        = string
  default     = "prod"
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 covers US, Canada and Europe."
  type        = string
  default     = "PriceClass_100"
}
