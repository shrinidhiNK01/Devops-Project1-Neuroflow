provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "neuroflow_data" {
  bucket = "neuroflow-${random_string.suffix.result}"
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

output "bucket_name" {
  value = aws_s3_bucket.neuroflow_data.bucket
}