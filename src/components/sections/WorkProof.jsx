import beforeWindow from '../../assets/images/work-proof/before-window.jpeg';
import afterWindow from '../../assets/images/work-proof/after-window.jpeg';
import exteriorWindows from '../../assets/images/work-proof/exterior-windows.jpeg';
import finishedWindows from '../../assets/images/work-proof/finished-windows.jpeg';

const PROOF_ITEMS = [
  {
    image: beforeWindow,
    label: 'Before',
    title: 'Window before service',
    description: 'Real residential glass before the cleanup started.',
  },
  {
    image: afterWindow,
    label: 'After',
    title: 'Cleaned exterior glass',
    description: 'A clearer finish after detailed exterior window cleaning.',
  },
  {
    image: exteriorWindows,
    label: 'Residential',
    title: 'Upper-level windows',
    description: 'Finished work on multi-level home windows.',
  },
  {
    image: finishedWindows,
    label: 'Detail',
    title: 'Clean frame and glass',
    description: 'Close-up proof of cleaner glass and tidy window edges.',
  },
];

export default function WorkProof() {
  return (
    <section className="work-proof" id="work-proof">
      <div className="container">
        <div className="work-proof__header">
          <div>
            <p className="work-proof__eyebrow">Real Work Proof</p>
            <h2 className="section-title">See the Difference on Actual Homes</h2>
          </div>
          <p>
            A small look at real residential window cleaning results, from before-and-after glass
            to finished exterior windows.
          </p>
        </div>

        <div className="work-proof__grid">
          {PROOF_ITEMS.map((item) => (
            <article className="work-proof__item" key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="work-proof__caption">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
