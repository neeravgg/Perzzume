import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type EnvironmentVariables = {
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRECT_KEY: string;
};

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRECT_KEY }: EnvironmentVariables = process.env as EnvironmentVariables;

const bucketName: string = AWS_BUCKET_NAME;
const region: string = AWS_BUCKET_REGION;
const accessKeyId: string = AWS_ACCESS_KEY;
const secretAccessKey: string = AWS_SECRECT_KEY;

const s3Client: S3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

// Define types for function arguments and return values
type UploadParams = {
    Bucket: string;
    Body: Buffer;
    Key: string;
    ContentType: string;
};

type GetObjectSignedUrlParams = {
    Bucket: string;
    Key: string;
};

async function uploadFile(fileBuffer: Buffer, fileName: string, mimetype: string) {
    const uploadParams: UploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    };

    return await s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName: string) {
    const deleteParams: { Bucket: string; Key: string } = {
        Bucket: bucketName,
        Key: fileName,
    };

    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

async function getObjectSignedUrl(image_name: string) {
    // const params: GetObjectSignedUrlParams = {
    //     Bucket: bucketName,
    //     Key: image_name,
    // };

    // const command = new GetObjectCommand(params);
    // // const seconds = 60;
    // const url = await getSignedUrl(s3Client, command);
    const url = `https://perzzume.s3.ap-south-1.amazonaws.com/${image_name}`
    return url;
}

export { uploadFile, getObjectSignedUrl, deleteFile };
