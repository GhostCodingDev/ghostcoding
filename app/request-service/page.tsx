import React from 'react'

const RequestServicePage = () => {
  return (
    <div>
      <h1>Request a Service</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Service:
          <select name="service" required>
            <option value="web-development">Web Development</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="seo">SEO</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default RequestServicePage
