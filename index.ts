import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { CmFrontend } from "./services/frontend";

function main() {
  new CmFrontend({
    Name: "Example1",
    Product: "buot",
  });
}
