import { createStore } from "@xstate/store";
import * as THREE from "three";
import { Transition } from "./project.store.types";

type Context = {
  transitions: Transition[];
  transition: Transition | null;
};

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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/824f0922-fa4a-4b97-9393-b05026b9804a.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/1c38f32a-edcb-4f07-be92-15b0581014a0.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/83e7a88f-660c-449a-b331-a2930bfc781c.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/83172565-e6fc-4f93-b2c2-572f811355cc.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/f42ea84e-5642-4e21-8ed0-32b42dae4936.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/7a1ab6b3-e8f7-4880-8ed8-522cd7debe2d.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/6e57ac38-a86e-4e32-b8f4-c7ed3df34a4c.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/c092fb94-5176-4b9d-87a9-b3aa3d8d613b.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/a0d68584-016d-4051-a5a8-fdd2dac93e3f.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/bb7a3e15-9489-4afe-b208-a4420793d109.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/faecde20-5997-4f00-b31b-dbe20606bb2c.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/eea5b5c4-9fc8-4726-97a9-bce5479c0bbe.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/8b3bbe3a-869e-489a-90b7-227e610759cf.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/3da46fb6-e6a4-4345-8e79-2bba54ff3a31.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/6958a0ce-846d-4d09-b30c-c528a7de2d49.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/158c7f3a-17b1-4caa-9297-a444cd467b54.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/0c0f227c-a52b-42d0-9a8b-1d777f7eb7cf.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/d9c8464b-f127-475e-879a-2d6bea895440.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/61ae4890-c737-43b9-bb1b-a10268949b85.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/6801da30-3659-4804-9e7e-595150de2c63.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/59acd76b-7e24-4438-82dc-6d48f687cf5a.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/0ad35d92-e2d1-4ea7-9a26-11a76171de1b.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/f4a9ee51-522d-4e42-9e24-59b1b148fa0f.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/ab1d2a66-3e8e-4821-bc84-71fa84f9d965.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/8af83a3a-cfff-43ee-a83c-0f3e4a613132.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/828b6371-13e4-4138-aabc-76a56f417b69.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/55ffe265-f5e7-48f7-9c8e-4f365661ae45.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/3c54c7b9-b66b-4fba-8c82-7bbc4ede074a.mp4",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/c71f4000-3873-4195-8647-2815d52db776.png",
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/08140670-dcb1-4226-b1d8-f18fa21c4b4a.png",
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/37723f9a-67e8-4073-b3f3-30256e10549c.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/bbd3a8a6-1a25-4ac5-94c5-809b2676a1d2.png",
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/f3b41ff4-6df7-4bf3-8741-0eadba3b3b04.png",
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/61b1d975-9596-4956-b978-31ba4719518d.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/da5e50eb-a6f0-41a0-94e1-2768b8496e7a.png",
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/dbf63265-c37c-4bd1-a40d-fe0c773eda24.png",
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/e2eec708-6d86-4b7e-84ba-800689e0fbea.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/5681046f-9f80-4257-931a-7e0f9a2d2273.mp4",
        },
        {
          Row: 1,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/5c44aa10-6473-4396-b5b0-ee76e26fba31.png",
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/eb401dc5-8f80-4cde-ba0c-47725fb0949c.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/00ca21c5-58db-454c-ba53-c190e700817a.mp4",
        },
        {
          Row: 1,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/b6bfe7ad-5ae2-422b-9b91-0f4b1cac5533.mp4",
        },
        {
          Row: 2,
          Column: 0,
          Kind: "image",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/d10af29f-1666-4a55-9f48-17f3f0a16723.png",
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
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/48e8d619-3e7a-4574-a37c-5524179f648f.mp4",
        },
        {
          Row: 1,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/c3d7eec9-6274-4e22-92a1-4cdf09296856.mp4",
        },
        {
          Row: 2,
          Column: 0,
          Kind: "video",
          MediaUrl:
            "https://test-v1.blr1.digitaloceanspaces.com/temp/workspace-3d55533a-bd09-4f73-bc85-4f0649284b55/6b114bac-dd9e-4f7c-ae32-264c94279495.mp4",
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
            console.log(videoElement);
            videoElement.play();
          }
        }
      }

      return { transition };
    },
  },
});
