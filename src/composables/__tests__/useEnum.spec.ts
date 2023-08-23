import { describe, it, expect } from 'vitest'

import { useEnum } from '../useEnum'

describe('useEnum hook', () => {
  const statusEnum = useEnum([
    ['Success', 1, '成功'],
    ['Fail', 0, '失败']
  ] as const)

  it('输出对象', () => {
    expect(statusEnum).toMatchObject({ Success: 1, Fail: 0, 1: '成功', 0: '失败' })
  })
})
