export function parseBucketAndObject(urlPath: string): [string, string] | null {
    if (urlPath.includes("gnfd://")) {
        urlPath = urlPath.substring("gnfd://".length);
    }

    const index = urlPath.indexOf("/");

    if (index <= -1) {
        throw new Error("URL is not in the correct format. Unable to parse bucket name and object name.");
    }

    const bucketName = urlPath.substring(0, index);
    const objectName = urlPath.substring(index + 1);

    return [bucketName, objectName];
}