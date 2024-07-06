using System.Reflection;

namespace JobSearchingWebApp.Helper
{
    public static class HelperMethods
    {
        public static IEnumerable<T> SortByProperty<T>(IEnumerable<T> lista, string propertyNaziv, bool ascending)
        {
            var props = propertyNaziv.Split('.');
            var propertyInfo = typeof(T).GetProperty(props[0], BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);

            if (propertyInfo == null)
            {
                throw new ArgumentException($"Property '{propertyNaziv}' does not exist on type '{typeof(T)}'");
            }

            return ascending
                ? lista.OrderBy(x => GetNestedPropertyValue(x, props))
                : lista.OrderByDescending(x => GetNestedPropertyValue(x, props));
        }

        public static object GetNestedPropertyValue(object obj, string[] props)
        {
            foreach (var prop in props)
            {
                if (obj == null) return null;

                var propInfo = obj.GetType().GetProperty(prop, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);

                if (propInfo == null) return null;

                obj = propInfo.GetValue(obj, null);
            }

            return obj;
        }
    }
}
