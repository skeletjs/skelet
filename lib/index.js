(async () => {
  await require('skelet-example/init')()

  const Example = require('skelet-example')
  Example.start()

  // No reassignment
  try {
    Example.unload = function () {}
  } catch (err) {
    console.log(err)
  }

  // No by Object.assign
  try {
    Object.assign(Example, { unload: function () {} })
  } catch (err) {
    console.log(err)
  }

  // No reassignment by defineProperty
  try {
    Object.defineProperty(Example, 'unload', {
      get: function () { return () => {} },
      set: function (newValue) { },
      enumerable: true,
      configurable: true
    })
  } catch (err) {
    console.log(err)
  }

  // No reassignment by override
  try {
    class Example2 extends Example.constructor {
      unload () {}
    }
    const a = new Example2()
    console.log(a)
  } catch (err) {
    console.log(err)
  }

  await Example.unload()

  Example.start()
  process.exit(0)
})()
