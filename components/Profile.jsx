import RecipeCard from "./RecipeCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="mt-9 md:px-24 px-6 bg-primary-foreground w-full">
      <h2 className="text-4xl font-bold text-gray-800">Perfil de <span className="text-primary">{name}</span></h2>
      <p className="text-gray-400 my-3">{desc}</p>

      <div className="mt-8 space-y-6 py-8 sm:columns-3 sm:gap-6 ">
        {data.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            handleEdit={() => handleEdit && handleEdit(recipe)}
            handleDelete={() => handleDelete && handleDelete(recipe)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile