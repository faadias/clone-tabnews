export default async function ping(request, response) {
  response.status(200).end("pong");
}
