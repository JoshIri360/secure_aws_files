const getUUID = require("uuid").v4;
const { Upload } = require("@aws-sdk/lib-storage");
const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.s3Uploadv2 = async (req) => {
  const uuid = getUUID();
  const key = `${req.query.user}/${uuid}-${req.file.originalname}`;
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

    return { file, uuid };
  } catch (err) {
    throw new Error("Internal server error", err);
  }
};

exports.getObjectsOfUser = async (user) => {
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
  const key = req.query.key;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command);
  return fetch(signedUrl).then((res) => res.text());
};
