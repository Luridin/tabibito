// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "picsum.photos",
//       },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

type RemotePattern = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>[number];

function getConfiguredRemotePattern(): RemotePattern | null {
  const configuredBaseUrl =
    process.env.R2_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_TRIP_PHOTO_BASE_URL;

  if (!configuredBaseUrl) {
    return null;
  }

  try {
    const parsed = new URL(configuredBaseUrl);

    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

const configuredRemotePattern = getConfiguredRemotePattern();

const nextConfig: NextConfig = {
  // Keep /tabibito on deployed builds, but use / in local development.
  basePath: process.env.NODE_ENV === "production" ? "/tabibito" : "",


  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-a1c2a0add823468281d32b1737490565.r2.dev",
        pathname: "/**",
      },
      ...(configuredRemotePattern ? [configuredRemotePattern] : []),
    ],
  },
};

export default nextConfig;
