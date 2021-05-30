import { useHistory } from 'react-router'
import useForm from '../../hooks/useForm'
import { createPlaylist } from '../../lib/api'
import ImageUpload from '../upload/ImageUpload'
import React from 'react'
import { setPlaylists } from '../../lib/auth'

function NewPlaylistForm(stopPushHistory) {
  const history = useHistory()
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false)
  const { formdata, handleChange } = useForm({
    name: '',
    text: '',
    cover: '',
    public: false,
  })
  const[usersPlaylists, setUsersPlaylists] = React.useState([])
  const handleUpload = (url) => {
    handleChange({ target: { name: 'cover', value: url } })
  }

  const handleCheckbox = ({ target }) => {
    handleChange({ target: { name: 'public', value: target.checked } })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await createPlaylist(formdata)
      setPlaylists(res.data.playlists)
      !stopPushHistory ? history.push(`/playlist/${res.data._id}`) : setShowSuccessMessage(true)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  

  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          {!showSuccessMessage ? (
            <form className="form" onSubmit={handleSubmit}>
              <label className="label has-text-centered">Create Playlist</label>
              <div className="field">
                <div className="control">
                  <label className="label">Name</label>
                  <input
                    className="input"
                    placeholder="Playlist Name"
                    name="name"
                    onChange={handleChange}
                    value={formdata.name}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Description</label>
                  <input
                    className="input"
                    type="input"
                    placeholder="Description of playlist"
                    name="text"
                    onChange={handleChange}
                    value={formdata.text}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Cover</label>
                  <ImageUpload onUpload={handleUpload} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">
                    Public: &nbsp;
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="public"
                      onChange={handleCheckbox}
                      value={formdata.public}
                    />
                  </label>
                </div>
              </div>
              <div className="field">
                <button className="button is-fullwidth is-dark" type="submit">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <p>New Playlist Created</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default NewPlaylistForm
