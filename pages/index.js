import Image from "next/image";

function Home() {
  return (
    <div>
      <h1>Guloseimas Extraordinárias da Maria Eufita - Site Oficial</h1>
      <Image
        alt="Rosto de uma gatinha frajola surpresa"
        src="data:image/jpg;base64,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"
      />
    </div>
  );
}

export default Home;
