export const hostHotel = {
  published: false,
  name: "",
  description: "",
  logo: "",
  href: "",
};

export default function HostHotel() {
  if (!hostHotel.published) return null;

  return (
    <section className="host-hotel" aria-labelledby="host-hotel-title">
      <p>Host hotel</p>
      <h2 id="host-hotel-title">{hostHotel.name}</h2>
      <p>{hostHotel.description}</p>
      <a href={hostHotel.href}>Explore the host hotel <span aria-hidden="true">→</span></a>
    </section>
  );
}
