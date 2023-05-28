export function parseBucketAndObject(urlPath: string): [string, string] | null {
  if (urlPath.includes("gnfd://")) {
    urlPath = urlPath.substring("gnfd://".length);
  } else {
    console.error(
      `URL is not in the correct format (gnfd://). Unable to parse bucket name and object name. ${urlPath}`
    );
  }

  const index = urlPath.indexOf("/");

  if (index <= -1) {
    throw new Error(
      "URL is not in the correct format. Unable to parse bucket name and object name."
    );
  }

  const bucketName = urlPath.substring(0, index);
  const objectName = urlPath.substring(index + 1);

  return [bucketName, objectName];
}
