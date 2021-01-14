require('dotenv').config();
const api = require('podcast-index-api')(
  process.env.API_KEY,
  process.env.API_SECRET,
);
const sharp = require('sharp');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Require the framework and instantiate it

const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('fastify-cors'), {});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'img'),
});

async function processImg(url) {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  const localFilePath = `${path.join(__dirname, 'img')}/${filename}`;
  if (fs.existsSync(localFilePath)) {
    return localFilePath;
  }
  const input = (await axios({ url: url, responseType: 'arraybuffer' })).data;
  await sharp(input)
    .resize(64, 64)
    .toFile(localFilePath)
    .then(info => {
      return localFilePath;
    })
    .catch(err => {
      return url;
    });
  return url;
}

fastify.get('/test', async function (request, reply) {
  const processed = await processImg(
    'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/348147/348147-1519854230321-6e090e4a733df.jpg',
  );
  reply.send(processed);
});
fastify.get('/', function (request, reply) {
  reply.send([
    'searchByTerm(term: String)',
    'podcastsByFeedUrl(url: String)',
    'podcastsByFeedId(id: Number)',
    'podcastsByFeedItunesId(itunesId: Number)',
    'episodesByFeedId(id: Number)',
    'episodesByFeedUrl(url: String)',
    'episodesByItunesId(itunesId: Number)',
    'recentEpisodes(max: Number, exclude: String)',
  ]);
});
fastify.get('/searchByTerm/:term', async function (request, reply) {
  // const json = await api.searchByTerm(request.params.term);
  // json.feeds = await json.feeds.map(async feed => {
  //   feed.image = await processImg(feed.image);
  // })
  // return json;
  const processed = await api.searchByTerm(request.params.term);
  reply.send(processed);
});
const opts = {
  schema: {
    body: {
      type: 'array',
    },
  },
};
fastify.post('/getFeedEpisodes', opts, async (request, reply) => {
  let episodesArray = [];
  const subs = request.body;
  for (let index = 0; index < subs.length; index++) {
    const sub = subs[index];
    const subEpisodes = await api.episodesByFeedId(sub);
    episodesArray.push(subEpisodes.items);
  }
  const sortedEpisodes = episodesArray
    .flat()
    .sort((a, b) => a.datePublished < b.datePublished);
  reply.send(sortedEpisodes);
});
fastify.post('/getSubscriptionDetails', opts, async (request, reply) => {
  let subsArray = [];
  const subs = request.body;
  for (let index = 0; index < subs.length; index++) {
    const sub = subs[index];
    const subscription = await api.episodesByFeedId(sub);
    subsArray.push(subscription.items);
  }
  const subscriptions = subsArray.flat();
  reply.send(subscriptions);
});
fastify.get('/podcastsByFeedUrl/:url', async function (request, reply) {
  const processed = await api.podcastsByFeedUrl(request.params.url);
  reply.send(processed);
});
fastify.get('/podcastsByFeedId/:id', async function (request, reply) {
  const processed = await api.podcastsByFeedId(request.params.id);
  reply.send(processed);
});
fastify.get('/podcastsByFeedItunesId/:id', async function (request, reply) {
  const processed = await api.podcastsByFeedItunesId(request.params.id);
  reply.send(processed);
});
fastify.get('/episodesByFeedId/:id', async function (request, reply) {
  const processed = await api.episodesByFeedId(request.params.id);
  reply.send(processed);
});
fastify.get('/episodesByFeedUrl/:url', async function (request, reply) {
  const processed = await api.episodesByFeedUrl(request.params.url);
  reply.send(processed);
});
fastify.get('/episodesByItunesId/:id', async function (request, reply) {
  const processed = await api.episodesByItunesId(request.params.id);
  reply.send(processed);
});
fastify.get('/recentEpisodes/:number/:exclude)', async function (
  request,
  reply,
) {
  const processed = await api.recentEpisodes(
    request.params.number,
    request.params.exclude,
  );
  reply.send(processed);
});

// Run the server!
fastify.listen(3000, '192.168.1.108', function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
