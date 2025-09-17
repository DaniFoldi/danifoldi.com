"use server";
import { getCloudflareContext } from "@opennextjs/cloudflare";


async function prime(env: CloudflareEnv) {
  const id = Math.floor(Math.random() * 1000000);
  const messages = [
    {
      role: "user",
      content:
        `The user is playing a text-based adventure game. Each game is different, this is game ${id}. Your first job is to create a short background story in 3-4 sentences. Scenarios may include interesting locations such as jungles, deserts, caves.
        After the first message, each of your messages will be responses to the user interaction. State three short options (A, B, C). The user responses will be the chosen action. Your responses should end by asking the user about their choice.
        Your message will be shown to the user directly, so avoid "Certainly", "Great", "Let's get started", and other filler content, and avoid bringing up technical details such as "this is game #id".
        The games should have a win condition that is actually feasible given the story, and if the player loses, the message should end with "Try again.".
        `,
    },
  ];
  const { response } = await env.AI.run("@cf/google/gemma-3-12b-it", { messages });

  return [
    ...messages,
    { role: "assistant", content: response }
  ];
}

/**
 * Server action for the adventure game.
 * Uses getCloudflareContext from @opennextjs/cloudflare to access env.
 *
 * @param input Story so far
 */
export async function adventureAction(input: any[]) {
  let { env } = await getCloudflareContext({ async: true });
  // Fallback for local development: provide a mock AI if not present
  if (!env?.AI) {
    env = {
      ...env,
      AI: {
        run: async (_model: string, { messages }: any) => {
          // Return a canned response for local/dev
          const last = messages[messages.length - 1]?.content || "";
          if (messages.length === 1) {
            return { response: "You are playing locally. This is a mock story.\nYou are in a mysterious room.\nA: Open the door\nB: Look around\nC: Scream for help\nWhat do you do?" };
          }
          return { response: `You chose: ${last}\nA: Option A\nB: Option B\nC: Option C\nWhat do you do?` };
        },
      },
    };
  }
  return input.length === 0
  ? await prime(env)
  : [...input,
      { role: "assistant", content: (await env.AI.run("@cf/google/gemma-3-12b-it", { messages: input })).response }
  ];
}
