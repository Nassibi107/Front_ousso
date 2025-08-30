export default function Products() {
  const products = [
    { name: "Ocean Breeze", color: "bg-teal" },
    { name: "Cool Mint", color: "bg-aqua" },
    { name: "Natural Fresh", color: "bg-freshGreen" },
  ];

  return (
    <section className="py-20 bg-cream text-darkBlue text-center">
      <h2 className="text-4xl font-bold mb-10">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        {products.map((p, i) => (
          <div
            key={i}
            className={`p-10 rounded-2xl shadow-xl ${p.color} text-white font-semibold`}
          >
            {p.name}
          </div>
        ))}
      </div>
    </section>
  );
}
