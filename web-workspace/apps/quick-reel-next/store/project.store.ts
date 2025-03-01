import { createStore } from "@xstate/store";
import * as THREE from "three";
import { Transition } from "./project.store.types";

type Context = {
  transitions: Transition[];
  transition: Transition | null;
};

const FPS = 30;

// TODO can be moved to data
const transitions: Transition[] = [
  {
    StartFrame: 1,
    EndFrame: 27,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/c846233d-5a6c-498c-9ea0-f93a41688aaf.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 28,
    EndFrame: 57,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 0,
        Columns: 0,
      },
      Content: [],
    },
  },
  {
    StartFrame: 58,
    EndFrame: 61,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/6edcf654-b045-4faf-9f54-61943408cec4.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 62,
    EndFrame: 63,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/aaf9df0c-cd02-40be-bb8a-491ad878fa7c.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 64,
    EndFrame: 66,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/bbfba73a-5deb-48fa-8a33-1096cdd5b32c.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 67,
    EndFrame: 69,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/ca366d47-66a1-4b30-9fd5-fc9f9dd6e8c8.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 70,
    EndFrame: 72,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/c6ce147c-a957-40be-a447-fe93ce7a9a4f.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 73,
    EndFrame: 75,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/847f5942-394c-4f97-9343-f9ee0ec6fa1b.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 76,
    EndFrame: 78,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/b29c9171-c5c8-4a83-9806-5c693ac3fc7e.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 79,
    EndFrame: 81,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/f7fa8bc8-9590-4814-bc1b-4e1a46fb8ed1.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 82,
    EndFrame: 84,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/99f79a2d-5cee-45b4-9b6b-868610c72645.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 85,
    EndFrame: 87,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/d37b462b-abf4-44d1-a534-1e144f55d592.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 88,
    EndFrame: 90,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/775d6cf9-1b5a-476c-9782-0748b555ed4e.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 91,
    EndFrame: 93,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/15953d5e-8d29-458a-8f0e-2441f7fe2891.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 94,
    EndFrame: 96,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/6b1789e0-597f-4aff-bbfe-f30145ff8cd3.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 97,
    EndFrame: 99,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/26758373-b55c-41be-b0f0-90277ee42726.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 100,
    EndFrame: 102,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/fb614d80-e8cd-42c8-ad6d-16e613dd282b.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 103,
    EndFrame: 105,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/33aadff4-dd94-4e78-bab4-55c9a3daf780.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 109,
    EndFrame: 126,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/926ff861-420d-41cf-8540-ca5f026be0b9.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 127,
    EndFrame: 172,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/940b56e0-2927-4cb0-b80c-5ee2431145ae.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 173,
    EndFrame: 183,
    Info: {
      Type: "dissolve",
      Grid: null,
      Content: [],
    },
  },
  {
    StartFrame: 184,
    EndFrame: 218,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/6be76e72-85a2-41d6-8176-d32d7270e960.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 219,
    EndFrame: 233,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/1e6bb403-9e9d-4ec9-b2d3-9037afdbfc72.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 234,
    EndFrame: 246,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/e727d02b-5914-4de3-b9bf-508c0e76eea7.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 247,
    EndFrame: 258,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/d1acd1ec-8e83-4181-96c3-d3f039e5b16e.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 259,
    EndFrame: 272,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/a70bbef2-008f-4c7d-8512-d3ffcb909227.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 273,
    EndFrame: 285,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/2dfe6053-9313-439b-8a8a-7aa431ede1e3.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 286,
    EndFrame: 299,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/a8f10a00-4dd4-498f-9873-a69b3412ba33.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 300,
    EndFrame: 312,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/cf05e134-6054-415d-a4c6-c08f2a6399c7.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 313,
    EndFrame: 326,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 1,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/18b0682d-450a-4e0d-a5c5-fed73ca20c4a.webm",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 327,
    EndFrame: 341,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 3,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/ee7f9b3e-6c28-4587-a529-398571c8c5a1.png",
          Margin: 0.3,
        },
        {
          Row: 1,
          Column: 0,
          Kind: "empty",
          MediaUrl: "",
          Margin: 0,
        },
        {
          Row: 2,
          Column: 0,
          Kind: "empty",
          MediaUrl: "",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 342,
    EndFrame: 353,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 3,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/995d4da1-46d1-476e-9fd2-7eaec49f8684.png",
          Margin: 0,
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/ae057afa-457f-4460-b674-7b1d99d42681.png",
          Margin: 0,
        },
        {
          Row: 2,
          Column: 0,
          Kind: "empty",
          MediaUrl: "",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 354,
    EndFrame: 363,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 3,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/2ecec81d-7304-4559-92e9-a27e108fc74f.png",
          Margin: 0,
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/e4e7d4dd-cc03-4723-a9e7-fb5b014ce455.png",
          Margin: 0,
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/02b26b24-6e89-48f0-b590-d90fd74314b4.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 364,
    EndFrame: 378,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 3,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/fee0f31d-a5e9-419a-91e3-7a4535e1a2e3.webm",
          Margin: 0,
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/668c4a7f-7974-41b9-8969-8bb31fd2033d.png",
          Margin: 0,
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/2b4ab1fc-efa9-4728-954d-2037cb439833.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 379,
    EndFrame: 392,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 3,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/37a0f559-249d-46ae-82ff-fc76c2254448.webm",
          Margin: 0,
        },
        {
          Row: 1,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/82cb7579-b392-4342-a9ff-e8f4bf65c5d2.webm",
          Margin: 0,
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/0abe1819-9fe2-48a1-a525-035a47071a4d.png",
          Margin: 0,
        },
      ],
    },
  },
  {
    StartFrame: 393,
    EndFrame: 422,
    Info: {
      Type: "layout",
      Grid: {
        Rows: 3,
        Columns: 1,
      },
      Content: [
        {
          Row: 0,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/d18a1a8d-3235-4892-9e96-5faca0117e0d.webm",
          Margin: 0,
        },
        {
          Row: 1,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/e7b6ca79-d58c-4cf2-821f-59e4e8c6075f.webm",
          Margin: 0,
        },
        {
          Row: 2,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-43f543b7-d08c-4d94-9dae-932dc66826fc/169599ec-b43c-40d1-9a02-9c75a8747baa.webm",
          Margin: 0,
        },
      ],
    },
  },
];

const context: Context = {
  transitions,
  transition: null,
};

export const projectStore = createStore({
  context,
  on: {
    addVideoInfo: (
      { transitions },
      event: {
        video: HTMLVideoElement;
        transitionIdx: number;
        contentIdx: number;
      }
    ) => {
      const videoTexture = new THREE.VideoTexture(event.video);
      transitions[event.transitionIdx].Info.Content[event.contentIdx].texture =
        videoTexture;
      return { transitions };
    },
    addImageInfo: (
      { transitions },
      event: {
        imageUrl: string;
        transitionIdx: number;
        contentIdx: number;
      }
    ) => {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(event.imageUrl);
      transitions[event.transitionIdx].Info.Content[event.contentIdx].texture =
        texture;

      return { transitions };
    },
    changeFrame: ({ transitions }, event: { frame: number }) => {
      const transition = transitions.find(
        (transition) =>
          event.frame >= transition.StartFrame &&
          event.frame <= transition.EndFrame
      );

      if (transition) {
        for (const content of transition.Info.Content) {
          if (content.Kind === "video") {
            const videoElement = content.texture?.source
              .data as HTMLVideoElement;
            const frame = event.frame - transition.StartFrame;
            videoElement.currentTime = frame / FPS;
          }
        }
      }

      return { transition };
    },
  },
});
