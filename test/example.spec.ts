import { Person, syncDb } from '../src/models/person'

beforeEach(async () => {
  await syncDb()
})

test('One equals to one', async () => {
  await Person.create({
    name: 'Joe',
    age: 25,
  })

  const people = await Person.findAll()
  const { name, age } = people[0].get()

  expect(name).toEqual('Joe')
  expect(age).toEqual(25)
})
