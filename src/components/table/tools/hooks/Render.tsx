export default function Render(props: { ctx: any }) {
  return props.ctx.slots.default()
}
