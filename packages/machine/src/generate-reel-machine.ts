import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { GenerateReelInput, GenerateReelOutput } from "@via/core/video-manager";
import { AppRouter } from "@via/server/app-router";
import { assign, createActor, fromPromise, setup } from "xstate";

export const getGenerateReelMachine = (fetch: any) => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:4000/trpc",
        fetch,
      }),
    ],
  });

  const generateReelMachine = setup({
    types: {
      context: {} as {
        errorMessage: string | null;
        generateReelOutput: GenerateReelOutput | null;
      },
      events: {} as  // All the events invoked by user
        | { type: "GENERATE_REEL"; input: GenerateReelInput }
        | { type: "CLOSE_RENDER_MODAL" }
        | { type: "EXPORT_VIDEO" }
        | { type: "CANCEL_EXPORT" },
    },
    actors: {
      // All the async services
      generateReel: fromPromise<GenerateReelOutput, GenerateReelInput>(
        async ({ input }) => {
          const res = await trpc.generateVideo.query(input);
          return res;
        }
      ),
    },
    actions: {
      saveGenerateReelOutput: assign({
        generateReelOutput: (data: any) => data.event.output,
        errorMessage: null,
      }),
      resetGenerateReelOutput: assign({ generateReelOutput: null }),
      saveError: assign({ errorMessage: (data: any) => data.event.error }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEkARAGQFEBiKgeQEEKB9ANUpsYGU2ACswDiNANoAGALqJQABwD2sXABdcC-LJAAPRACYA7AGYSAVgOnTARgN6AHEYAsRvQDZTAGhABPRFbt6EiR2xnqBNi4BAL5RXmhYeISklLR0AMJUZGkA0mwAcjQA6pzcjGwAQgCqACrVjHmSMkggispqGlq6CIYm5pY29k4u7l6+CEaudiQAnI4SEsYGjgZ2pnoxcRg4BMTk1PQZWblcFDxsAEqMhY1ararqms1dPWYW1rYOzm6ePohLU8snNN5hIjFYnOtYiB4tskntUoccmxTrRqjQSqdGDdmnd2o9QM9jK9+h8ht9Rn5+iRHOZ5uZIu5XBtoVtErsUvReDRmOc0gAJDE8bHyJT3DpPfREvrvQZfEa-BCMszmPRGNaq1zgqzMmFs5L7OiiArnZhowVY6S3UV4zqS3pvAafYY-MZWKwSUzBCR6YFWaamNXuSGbBI7UgAWWY2TIeWE5roEA0YBIBAAbgoANbJ3VhkiR6Ox80INMKTDoPGNYUta0PW0IOyORwkBbet7+iQOaYUhDupYkAz+VzA+Z6OU61m5-MxuMnHh0MAAJwXCgXJDkABtywAzFeoEg5uFTwuzxjF-DpssV6RV3G1iX1xvNgytyztzvdt16KxmVVGJY0gxXGWJkoQPXZzhoPJTnOc02HDRgKGYKh0iYLkLkg6C4IQpCbxrcUCUQBsmxbQxX1MDsjC7BU7EmakJH8aYwWBPRTFmcdQ0PKNp3NfgADFmDIWgKDobRYBUctk3QLcVEXZB3SIOgwIjLjj1KPiBKE3C2jvAiEH9aYSCGVxbDlOxpio11RwM-0gyHeZHDsCQQJDWFdlEWpuJPXgEyTFNz0zbMJzhdzqk8tSzwvcsHkrS0cTw-EdH0GwghCcyDGfQD6VcD8AybUwzKMEIHIhEJ2Nc0gQrCzFvMXZdVw3bdd33IK3JoDzVOqiLSyijQYqaEVtPwxLumS4IDDSjL3GMbKFSsRwfRIexpjM6xZj-KxnJZDjdlYdgTzYXjGHOcM2EYARIJoYTEVyXbzS0sUEq6IinxfVjyPfBUJhMNUG0A6YrDWBwnLKvUSFu-bDuO07zoKK7UPRcHSgOo7w3um17x9b8aTBObjJ+gcXUQJiSCsUjpmMnoPQMEHcyYVgqrOU5qg07zE0IPz0yzZrttIOmKAZsomZZrrL2i69YoGh662eki23eyjuwHAxDLM+xNT9AIjBpuE+YF5E2pZ+clxXNdNxUHcFz3JSSF1jrGYNwTeBFnr8D6q1BsewjH1lsiKIsv4gJJxjpmfPpQUA7Xdn2oXHbYXhKjSNIaF4bzRPEmSSCkmSFzkiQFOt6OHaofh48T5PeDRnThv0wznAp0zzO7RxgWCcjAlWOZxrdSPSEL5nY-4wTLpEsSJMz6TZPkxSWt7pGY+Lg6NMuyuhq6GujJM4YzP9vTXBMKanP9Adlu1UCZ5ISq7b4Reh+EtOx6zye8+nnmL7a0Kr-U2+V897ov2I584JjKzGBDNMYdhvwuExvNMyEhHB72pmfV+l8ZxqTjgnJOKcR7p0khPHOU9rYoJ4ugsuKcf51jCHNF6QDxrNych+P8rh+yqnom4QCQElg9zBhQfmV8fLsxLFza2u0BbOyvFIch95wTLBJkYb09FXBuH+g4bsf4DILBWv8AcNFlhcJEXw2qJsGrmyasInhoiSyi16uLfq1YPZ1mkcrcE8iNpKP8EYbs9gnGKKWEBCimp-R6PMVfEhmDU6jwzo-fBz8zG8NQZiUJ5dJG6X8KYJsLEWIh3IsseBqjxpPk0Q5bRHCglxNgoPIS2CH54Nzvnc++j4lnAqcvCWdipZSIcp6NwEClgAycD4zx8xFoZLSc3cmy1HBcJRG1AW-DkyCMCq-aZH9GmnksS7N2cV7H3hls+Uib0-Y5UCIZWw40-w9KME4KZNBUSzMMfVM2Fsrbn2WRY-yVjXY2Pdu03SuzXpvgVrNUwxkSbpWWJrIcDlrm3JCaXMJVTIk1IIS8m5MzYUYKSa028q8-CaiCHvWUZlFHmCOUEP8hhGIrAiFcpB5USCvJCc0u+ETcHZ1qS-OlDLVk300li+KdZ15103t0xus0hyejxXvJy40qVa1paDLkPJ+SzPvoitlyLX6Kt5HyAWyThqOD9Mw8EThzBnPMmAxArgJAGQsCxcigFOwNhiFCfACgIBwC0Epb56NdIAFoLUIH9c2EEIbQ3TGDFtOlHJvVVy6PND8jlvyfl6U5GkjlNrWyPKsmNOLFTWpmD6dw4a7AlsAR+DsehlSzDdONf0JbJnytzBBKCNAYL7XgohKgObf7ulmP2CilybBpIbB42aoImH5XTdK9KTk7BcKzcQpl3aHHWqbM+Bwg6LAOWcB+QIBkXD5SyRYLd0wuFEK8suqRIcDKagHDSH0jllgfmbhKliao6HzTSYglyoNEYJMhidM6F0KCXt0pYZWBqwj-XSgDGwjhVF7zMH6cNzdDANn+hm8+ttuXz14KB4a+UsZhAHGCGdwId62C6T6LJQFgWzEw6-PuLNEkp3w10Xta6B2keHTuhUwDFr5UZONciIc5U-tzExgeS8QNbJ+cNDj-aN3ce3aOsY4aTDeiAnMUclHrBnvfgLL+Qk2P6CBNSfpDZJ2BGMAw-6JNWJ+lYp0uRp7G3BQM5-FjeHZM+uGqqZu5n4GWZLdZ1Tfhm5MLTRYCB+Vnxicjb+4J2afOxr8FqJ8pMWHzXMjvJwQQ3QRbtSsZw8DSl6zheXEzPY8UkAJZ8IlLEDCqLSYZME5h3TkTSZRb9CXcwNPKdJqrG13S1ciE4BrJKFRWWbC4Dr7h5qqgjdbLl5oqtWqYaOOBzc+nTR3gDewi1wTWHAyW0t0K0Xcoq6xlLubHGyJcYooc7jn3+lq2+tJwJP26Lc7sFbENBs3Z7auxTlzlMjo-PNmYjl5hHc65YLhWrlVXyq2kz0HZD2rFnSovjhrGJwKHP9TTjFnVRCAA */
    context: {
      errorMessage: null, // any error message when something went wrong
      generateReelOutput: null,
    },
    initial: "IDLE",
    states: {
      IDLE: {
        on: {
          GENERATE_REEL: "GENERATING_REEL",
        },
      },
      GENERATING_REEL: {
        invoke: {
          src: "generateReel",
          input: (data: any) => data.event.input,
          onDone: {
            target: "RENDER_VIDEO_MODAL",
            actions: "saveGenerateReelOutput",
          },
          onError: "MAKING_VIDEOS_FAILED",
        },
      },

      RENDER_VIDEO_MODAL: {
        on: {
          EXPORT_VIDEO: {
            target: "EXPORT_MODAL_OPENED",
          },
          CLOSE_RENDER_MODAL: {
            actions: "resetGenerateReelOutput",
            target: "IDLE",
          },
        },
      },
      EXPORT_MODAL_OPENED: {
        on: {
          CANCEL_EXPORT: {
            target: "RENDER_VIDEO_MODAL",
          },
        },
      },
      MAKING_VIDEOS_FAILED: {
        entry: "saveError",
        after: {
          10: "IDLE",
        },
      },
    },
  });

  return generateReelMachine;
};

export const getGenerateReelActor = (fetch: any) => {
  const videoManagementMachine = getGenerateReelMachine(fetch);
  const actor = createActor(videoManagementMachine);
  return actor;
};
