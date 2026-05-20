output "s3_bucket_name" {
  description = "Name of the S3 bucket storing the static assets."
  value       = aws_s3_bucket.frontend.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket."
  value       = aws_s3_bucket.frontend.arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID — required for cache invalidation."
  value       = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_domain_name" {
  description = "Public CloudFront URL to access the deployed frontend."
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}
