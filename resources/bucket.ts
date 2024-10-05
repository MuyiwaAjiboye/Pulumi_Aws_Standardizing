import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { getStack } from "@pulumi/pulumi";

type CmBucketsArgs = {
  Name: string;
  Product: string;
};

export class CmBuckets extends pulumi.ComponentResource {
  constructor(args: CmBucketsArgs, opts?: pulumi.ComponentResourceOptions) {
    const resourceName = "${args.Product}-${args.Name} ";
    super("pkg:index:CmBuckets", resourceName, {}, opts);

    const stack = getStack();

    const bucket = new aws.s3.BucketV2(
      args.Name,
      {
        bucket: resourceName,
        tags: {
          Name: "My bucket",
          Environment: "Dev",
        },
      },
      { parent: this },
    );

    new aws.s3.BucketPublicAccessBlock(
      args.Name,
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
