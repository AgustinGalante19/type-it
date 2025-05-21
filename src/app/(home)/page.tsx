import CodeTransformer from './components/code-transformer';
import Header from './components/header';

export default function Home() {
  return (
    <div className='lg:container mx-auto max-sm:p-4 lg:my-8 space-y-4'>
      <Header />
      <CodeTransformer />
    </div>
  );
}
