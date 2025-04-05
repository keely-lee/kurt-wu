import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export default class AwsClient {
  constructor() {
    this.s3Client = new S3Client({
      region: "us-east-1",
      // You'll also need to configure the CORS settings on the bucket to allow traffic from
      // this example site. Here's an example configuration that allows all origins. Don't
      // do this in production.
      //[
      //  {
      //    "AllowedHeaders": ["*"],
      //    "AllowedMethods": ["GET"],
      //    "AllowedOrigins": ["*"],
      //    "ExposeHeaders": [],
      //  },
      //]
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: "us-east-1" },
        identityPoolId: "us-east-1:692040d6-a6c8-4b4b-aa49-e2452c8d3811",
      }),
    });
  }

  static BUCKET = "kurtwuphotography";

  getAlbumContents = async (albumPath, delimiter = "/", bucket = AwsClient.BUCKET) => {
    // albumPath: 'photos/' or 'photos/albumName/
    const albumObj = await this.s3Client.send(new ListObjectsCommand({ Bucket: bucket, Delimiter: delimiter, Prefix: albumPath}));
    return albumObj;
  }

  getBucketObject = async (key, bucket = AwsClient.BUCKET) => {
    // key: 'photos/photoName.jpg' or 'photos/albumName/photoName.jpg'
    const imageObj = await this.s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return imageObj;
  }


  /* 
    ** img src urls from listObjectsCommand via aws-sdk rather than individual getObjectCommand **
    https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photos-view.html
    note: need prefix for nested albums
    albumbucketname = BUCKET,
    href = this.request.httpRequest.endpoint.href 
    bucketUrl = href + albumbucketname + "/" => href + BUCKET + "/"
    photoKey = content.Key ex: photos/temp-photo.jpg
    source => bucketUrl + encodeURIComponent(photoKey)
    EX: `https://s3.amazonaws.com/${BUCKET}/photos/temp-photo.jpg
  */

  // [TODO]: Look into cloudfront, promises? & other ways to minimize high GET requests
}
