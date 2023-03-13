const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

module.exports = {
  // Your other Next.js configs

  webpack: function (config, { isServer }) {
    // Your other webpack configs

    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    return config;
  }
};
