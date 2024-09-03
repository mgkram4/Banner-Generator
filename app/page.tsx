import PatternGenerator from "./components/generator";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">X Header Pattern Generator</h1>
      <PatternGenerator />
    </div>
  );
}