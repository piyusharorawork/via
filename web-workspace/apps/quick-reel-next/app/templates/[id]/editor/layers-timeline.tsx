// import { Layer, Segment } from "@/store/project.store.types";

// type Props = {
//   layers: Layer[];
// };

// export const LayersTimeline = (props: Props) => {
//   return (
//     <section
//       id="layers-timeline"
//       className="h-full flex flex-col px-2 gap-1 overflow-x-scroll"
//     >
//       {props.layers.map((layer, index) => (
//         <LayerRow layer={layer} key={index} />
//       ))}
//     </section>
//   );
// };

// type LayerRowProps = {
//   layer: Layer;
// };

// const LayerRow = (props: LayerRowProps) => {
//   return (
//     <section
//       id="layer-row"
//       className="flex flex-grow shrink-0 rounded-xl gap-1"
//     >
//       {props.layer.Segments.map((transition, index) => (
//         <LayerTransition transition={transition} key={index} />
//       ))}
//     </section>
//   );
// };

// type LayerTransitionProps = {
//   transition: Transition;
// };

// const LayerTransition = (props: LayerTransitionProps) => {
//   return (
//     <section
//       id="layer-transition"
//       className="bg-red-200 shrink-0"
//       style={{
//         width: `calc(${props.transition.EndFrame - props.transition.StartFrame} * 10px)`,
//       }}
//     >
//       {/* <img
//         src={props.transition.PreviewUrl}
//         className="object-contain w-full h-full"
//       /> */}
//     </section>
//   );
// };
