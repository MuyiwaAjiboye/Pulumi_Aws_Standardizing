import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { getStack } from "@pulumi/pulumi";

type CmBucketsArgs = {
  Name: string;
  Product: string;
  Public?: boolean;
};

export class CmBuckets extends pulumi.ComponentResource {
  constructor(args: CmBucketsArgs, opts?: pulumi.ComponentResourceOptions) {
    const resourceName = "${args.Product}-${args.Name} ";
    super("pkg:index:CmBuckets", resourceName, {}, opts);

    const stack = getStack();

    const bucket = new aws.s3.BucketV2(
      args.Name,
      {
        acl: "Private",
        bucket: resourceName,
        tags: {
          Environment: "Dev",
        },
      },
      { parent: this },
    );

    if (!args.Public) {
      new aws.s3.BucketPublicAccessBlock(
        "example",
        {
          bucket: bucket.id,
          blockPublicAcls: true,
          blockPublicPolicy: true,
          ignorePublicAcls: true,
          restrictPublicBuckets: true,
        },
        { parent: this },
      );
    }
  }
}
