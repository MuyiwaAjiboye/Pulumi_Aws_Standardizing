import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { CmBuckets } from "./resources/bucket";

const bucketlist: string[] = ["example1", "example2"];

for (const bucket in bucketlist) {
  new CmBuckets({
    Name: bucket,
    Product: "FirstBucket",
  });
}
