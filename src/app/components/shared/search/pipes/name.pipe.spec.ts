import { NameFilterPipe } from './name.pipe';

describe('NamePipe', () => {
  it('create an instance', () => {
    const pipe = new NameFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
