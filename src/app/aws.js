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


  //  Delimiter: "/", Prefix: "photos/" -> response.Contents for items (including current folder)
  // ** ignore videos for now, focus on photos and photo albums
  // major error handling needed 

  static BUCKET = "kurtwuphotography";
  static photosCommand = new ListObjectsCommand({ Bucket: AwsClient.BUCKET, Delimiter: "/", Prefix: "photos/" });
  static videosCommand = new ListObjectsCommand({ Bucket: AwsClient.BUCKET, Delimiter: "/", Prefix: "videos/" });
  
  getAlbumContents = async (albumPath, delimiter = "/", bucket = AwsClient.BUCKET) => {
    // [TODO]: skip over folder in mapping of images
    const prefix = albumPath.slice(-1) === "/" ? albumPath : albumPath + "/"; 
    const albumObj = await this.s3Client.send(new ListObjectsCommand({ Bucket: bucket, Delimiter: delimiter, Prefix: prefix}));
    return albumObj;
  }

  getPhotos = async () => {
    try {
      const photosObjs = await this.s3Client.send(AwsClient.photosCommand);
      return photosObjs;
    } catch (e) {
      console.log('error')
      console.log(e)
      console.log('---------')
    }
  }

  getVideos = async () => {
    const videosObjs = await this.s3Client.send(AwsClient.videosCommand);
    return videosObjs;
  }

  _getBucketObject = async (key = 'photos/temp-photo.jpg', bucket = AwsClient.BUCKET) => {
    const imageObj = await this.s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return imageObj;
  }
  
  getImageSrc = async (key) => {
    const imageObj = await this._getBucketObject(key);
    const srcString = await imageObj.Body.transformToString('base64');
    return srcString;
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
  //  return <img key={o.ETag} src={`data:image/png;base64,${photoContent}`} />

}
