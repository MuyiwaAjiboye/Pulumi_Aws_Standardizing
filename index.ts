import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { CmBuckets } from "./resources/bucket";

new CmBuckets({
  Name: "Bucket1",
  Product: "FirstBucket",
});
