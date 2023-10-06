const { Upload } = require("@aws-sdk/lib-storage");
const {
  S3,
  S3Client,
  GetObjectCommand,
  paginateListObjectsV2,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const getAllS3Files = async (s3Opts) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  });

  const totalFiles = [];

  for await (const data of paginateListObjectsV2({ client }, s3Opts)) {
    totalFiles.push(...(data.Contents ?? []));
  }
  return totalFiles;
};

exports.s3Uploadv2 = async (req, res) => {
  const key = `${req.query.user}/${req.file.originalname}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer,
  };

  try {
    const file = await new Upload({
      client: s3,
      params: uploadParams,
    }).done();
    return { status: 200, message: "success" };
  } catch (err) {
    return { status: 400, message: "Internal Server Error" };
  }
};

exports.checkDuplicates = async (req, res) => {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: `${req.query.user}`,
  };

  const allKeys = await getAllS3Files(params);

  for (const k of allKeys) {
    if (k.Key.includes(req.file.originalname)) {
      return { status: 409, message: "File already exists" };
    }
  }
};

exports.getObjectsOfUser = async (user) => {
  "user", user;
  try {
    const result = await s3.listObjectsV2({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: user,
    });

    const objects = result.Contents;

    return objects;
  } catch (err) {
    throw new Error("Internal server error");
  }
};

exports.getObject = async (req) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.body.fileName,
  });

  const signedUrl = await getSignedUrl(s3, command);
  return fetch(signedUrl).then((res) => res.text());
};
