import Button from "../../../shared/components/Button";
import { useCustomers } from "../hooks/useCustomers";

interface CustomersPageProps {
  page: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

function CustomersPage({
  page,
  onPreviousPage,
  onNextPage,
}: CustomersPageProps) {
  const { customers, meta, loading, error } = useCustomers(page);

  return (
    <>
      {loading ? <p>Cargando clientes...</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}

      {!loading && !error ? (
        <section className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Teléfono</th>
                <th className="px-4 py-3 font-medium">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={String(customer.id)}
                  className="border-t border-gray-100"
                >
                  <td className="px-4 py-3">{String(customer.id)}</td>
                  <td className="px-4 py-3">
                    {(customer.full_name as string) ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    {(customer.email as string) ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    {(customer.phone as string) ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    {(customer.description as string) ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 ? (
            <p className="p-4 text-sm">No hay clientes para mostrar.</p>
          ) : null}
        </section>
      ) : null}

      {meta ? (
        <footer className="mt-4 flex items-center justify-between text-sm">
          <p>
            Página {meta.current_page} de {meta.last_page} · Total: {meta.total}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={onPreviousPage}
              disabled={page <= 1 || loading}
              className="bg-gray-700"
            >
              Anterior
            </Button>
            <Button
              onClick={onNextPage}
              disabled={!meta || page >= meta.last_page || loading}
              className="bg-gray-700"
            >
              Siguiente
            </Button>
          </div>
        </footer>
      ) : null}
    </>
  );
}

export default CustomersPage;
