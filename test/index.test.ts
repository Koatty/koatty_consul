import assert from "assert";
import { Helper, Koatty } from "koatty";
import { KoattyConsul } from "../src/index";

describe("Test", () => {
  it("TestResolverService", async () => {
    try {
      const app = new Koatty();
      // TODO
      // await KoattyConsul({
      //   host: "127.0.0.1",
      //   port: "8500"
      // }, app);
      // const metaData = app.getMetaData("ResolverService");
      // return metaData[0]({
      //   service: "pb.Say.grpc",
      //   tag: "111",
      //   passing: true,
      // }).then((d) => {
      //   assert.equal(Helper.isEmpty(d), false);
      // })
    } catch (error) {
      assert.fail(error);
    }
  })
})