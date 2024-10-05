import * as pulumi from "@pulumi/pulumi";
import { CmBuckets } from "../resources/bucket";

type CmBucketsArgs = {
  Name: string;
  Product: string;
};

export class CmFrontend extends pulumi.ComponentResource {
  constructor(args: CmBucketsArgs, opts?: pulumi.ComponentResourceOptions) {
    const resourceName = "${args.Product}-${args.Name} ";
    super("pkg:index:CmFrontend", resourceName, {}, opts);

    const source = new CmBuckets({
      Name: args.Name,
      Product: args.Product,
    });
  }
}
